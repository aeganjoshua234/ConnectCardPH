import { DigitalProfile } from '../types';

/**
 * Generates and triggers download of a standardized vCard (.vcf) file
 * Compatible with Apple iOS Contacts, Google Contacts, Samsung Contacts, and Outlook
 */
export function downloadVCard(profile: DigitalProfile): void {
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.fullName}`,
    `N:${profile.fullName.split(' ').slice(-1)[0]};${profile.fullName.split(' ').slice(0, -1).join(' ')};;;`,
    `ORG:${profile.company}`,
    `TITLE:${profile.headline}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `EMAIL;TYPE=WORK,INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `ADR;TYPE=WORK:;;${profile.location};;;;`,
    `NOTE:${profile.bio}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.fullName.replace(/\s+/g, '_')}_ConnectCard.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
