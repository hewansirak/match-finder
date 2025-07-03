/**
 * Calculate age from date of birth
 * @param dob - Date of birth in ISO format (YYYY-MM-DD) or Date object
 * @returns Age in years
 */
export const calculateAge = (dob: string | Date): number => {
  const birthDate = typeof dob === 'string' ? new Date(dob) : dob;
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't occurred this year yet, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Calculate zodiac sign from date of birth
 * @param dob - Date of birth in ISO format (YYYY-MM-DD) or Date object
 * @returns Zodiac sign with symbol (e.g., "♈ Aries")
 */
export const calculateZodiacSign = (dob: string | Date): string => {
  const birthDate = typeof dob === 'string' ? new Date(dob) : dob;
  const month = birthDate.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
  const day = birthDate.getDate();

  // Zodiac sign date ranges based on Western astrology
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "♈ Aries";
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "♉ Taurus";
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "♊ Gemini";
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "♋ Cancer";
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "♌ Leo";
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "♍ Virgo";
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "♎ Libra";
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "♏ Scorpio";
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "♐ Sagittarius";
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "♑ Capricorn";
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "♒ Aquarius";
  }
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "♓ Pisces";
  }

  // Fallback (should never reach here with valid dates)
  return "♈ Aries";
};

/**
 * Get zodiac sign name only (without symbol)
 * @param dob - Date of birth in ISO format (YYYY-MM-DD) or Date object
 * @returns Zodiac sign name only (e.g., "Aries")
 */
export const getZodiacSignName = (dob: string | Date): string => {
  const fullSign = calculateZodiacSign(dob);
  return fullSign.split(' ')[1]; // Remove the symbol, return only the name
};

/**
 * Get zodiac sign symbol only
 * @param dob - Date of birth in ISO format (YYYY-MM-DD) or Date object
 * @returns Zodiac sign symbol only (e.g., "♈")
 */
export const getZodiacSignSymbol = (dob: string | Date): string => {
  const fullSign = calculateZodiacSign(dob);
  return fullSign.split(' ')[0]; // Return only the symbol
};

/**
 * Format date to readable string
 * @param date - Date in ISO format or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Check if date is valid
 * @param date - Date to validate
 * @returns Boolean indicating if date is valid
 */
export const isValidDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

/**
 * Get zodiac compatibility traits (for fun features)
 * @param sign1 - First zodiac sign name
 * @param sign2 - Second zodiac sign name
 * @returns Basic compatibility description
 */
export const getZodiacCompatibility = (sign1: string, sign2: string): string => {
  const fireSign = ['Aries', 'Leo', 'Sagittarius'];
  const earthSigns = ['Taurus', 'Virgo', 'Capricorn'];
  const airSigns = ['Gemini', 'Libra', 'Aquarius'];
  const waterSigns = ['Cancer', 'Scorpio', 'Pisces'];

  const getElement = (sign: string) => {
    if (fireSign.includes(sign)) return 'Fire';
    if (earthSigns.includes(sign)) return 'Earth';
    if (airSigns.includes(sign)) return 'Air';
    if (waterSigns.includes(sign)) return 'Water';
    return 'Unknown';
  };

  const element1 = getElement(sign1);
  const element2 = getElement(sign2);

  if (element1 === element2) {
    return "Perfect elemental match! You share similar energies and perspectives.";
  }
  
  if ((element1 === 'Fire' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Fire')) {
    return "Dynamic combination! Fire and Air create excitement and passion.";
  }
  
  if ((element1 === 'Earth' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Earth')) {
    return "Nurturing match! Earth and Water create stability and growth.";
  }

  return "Complementary energies! Your differences create an interesting dynamic.";
};
