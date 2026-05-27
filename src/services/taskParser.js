// Domain service (pure function), co-located with infrastructure services for simplicity
// See ADR-012 and DDD context: App → Smart Task Parsing

/**
 * Parses natural language task input into structured task data.
 *
 * Pipeline (ordered by precedence):
 *   1. Priority detection — !!! / urgent / asap → high; low priority / whenever → low
 *   2. Date extraction — by/due/on <date>, next <day>, tomorrow, today → ISO date
 *   3. Contact matching — case-insensitive substring match against existing contacts
 *
 * @param {string} rawText - The natural language task input
 * @param {Array<{id: string, name: string}>} existingContacts - Contacts to match against
 * @returns {{ title: string, priority: 'low'|'medium'|'high', dueDate: string|null, matchedContactName: string|null }}
 */
export function parseTaskInput(rawText, existingContacts) {
  const result = {
    title: rawText,
    priority: 'medium',
    dueDate: null,
    matchedContactName: null,
  };

  if (!rawText || typeof rawText !== 'string') {
    result.title = '';
    return result;
  }

  let text = rawText;

  // Step 1: Extract priority (highest precedence)
  text = extractPriority(text, result);

  // Step 2: Extract date
  text = extractDate(text, result);

  // Step 3: Match contact (lowest precedence — does NOT modify title)
  matchContact(text, existingContacts, result);

  result.title = text.replace(/\s+/g, ' ').trim();
  return result;
}

/**
 * Detects priority markers and strips them from text.
 */
function extractPriority(text, result) {
  // High priority: !!!, urgent, asap
  if (/!!!/.test(text)) {
    result.priority = 'high';
    text = text.replace(/!!!/g, '');
  } else if (/\burgent\b/i.test(text)) {
    result.priority = 'high';
    text = text.replace(/\burgent\b/gi, '');
  } else if (/\basap\b/i.test(text)) {
    result.priority = 'high';
    text = text.replace(/\basap\b/gi, '');
  }
  // Low priority: "low priority", whenever
  else if (/\blow\s+priority\b/i.test(text)) {
    result.priority = 'low';
    text = text.replace(/\blow\s+priority\b/gi, '');
  } else if (/\bwhenever\b/i.test(text)) {
    result.priority = 'low';
    text = text.replace(/\bwhenever\b/gi, '');
  }

  return text;
}

/**
 * Extracts date phrases and resolves them to ISO date strings.
 */
function extractDate(text, result) {
  const today = new Date();

  // "tomorrow"
  const tomorrowMatch = text.match(/\btomorrow\b/i);
  if (tomorrowMatch) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    result.dueDate = formatDate(tomorrow);
    return text.replace(/\btomorrow\b/i, '');
  }

  // "today"
  const todayMatch = text.match(/\btoday\b/i);
  if (todayMatch) {
    result.dueDate = formatDate(today);
    return text.replace(/\btoday\b/i, '');
  }

  // "next <day>"
  const nextDayMatch = text.match(/\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
  if (nextDayMatch) {
    const targetDay = parseDayName(nextDayMatch[1]);
    const date = getNextWeekday(today, targetDay);
    result.dueDate = formatDate(date);
    return text.replace(nextDayMatch[0], '');
  }

  // "by <date>", "due <date>", "on <date>"
  const byDueOnMatch = text.match(/\b(by|due|on)\s+([A-Za-z]+\s+\d{1,2}(?:,?\s*\d{4})?)\b/i);
  if (byDueOnMatch) {
    const parsed = parseNaturalDate(byDueOnMatch[2], today);
    if (parsed) {
      result.dueDate = formatDate(parsed);
      return text.replace(byDueOnMatch[0], '');
    }
  }

  return text;
}

/**
 * Matches contact names (case-insensitive substring) without modifying the title.
 */
function matchContact(text, existingContacts, result) {
  if (!existingContacts || existingContacts.length === 0) return;

  const lowerText = text.toLowerCase();

  // Sort by name length descending so we match the most specific name first
  const sorted = [...existingContacts].sort(
    (a, b) => b.name.length - a.name.length
  );

  for (const contact of sorted) {
    if (lowerText.includes(contact.name.toLowerCase())) {
      result.matchedContactName = contact.name;
      return;
    }
  }
}

// --- Helper functions ---

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDayName(name) {
  const days = {
    sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6,
  };
  return days[name.toLowerCase()];
}

function getNextWeekday(from, targetDay) {
  const date = new Date(from);
  const currentDay = date.getDay();
  let daysUntil = targetDay - currentDay;
  if (daysUntil <= 0) daysUntil += 7;
  date.setDate(date.getDate() + daysUntil);
  return date;
}

function parseNaturalDate(text, referenceDate) {
  const months = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const match = text.match(/^([A-Za-z]+)\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (!match) return null;

  const monthName = match[1].toLowerCase();
  const day = parseInt(match[2], 10);
  const year = match[3] ? parseInt(match[3], 10) : referenceDate.getFullYear();

  if (!(monthName in months)) return null;
  if (day < 1 || day > 31) return null;

  return new Date(year, months[monthName], day);
}
