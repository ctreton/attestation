import { downloadBlob } from './dom-utils'
import pdfBase from '../certificate.pdf'
import { generatePdf } from './pdf-util'

export async function generatePerso () {
  const creationInstant = new Date()
  const creationDate = creationInstant.toLocaleDateString('fr-CA')
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-')

  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has('a') &&
    urlParams.has('b') &&
    urlParams.has('c') &&
    urlParams.has('f') &&
    urlParams.has('l') &&
    urlParams.has('p') &&
    urlParams.has('z') &&
    urlParams.has('r')) {
    const address = urlParams.get('a')
    const birthday = urlParams.get('b')
    const city = urlParams.get('c')
    const firstname = urlParams.get('f')
    const lastname = urlParams.get('l')
    const placeofbirth = urlParams.get('p')
    const zipcode = urlParams.get('z')
    const reason = urlParams.get('r')

    const pdfBlob = await generatePdf(
      {
        address: address,
        birthday: birthday,
        city: city,
        datesortie: creationDate,
        firstname: firstname,
        heuresortie: creationHour,
        lastname: lastname,
        'ox-achats': 'achats',
        'ox-convocation': 'convocation',
        'ox-enfants': 'enfants',
        'ox-famille': 'famille',
        'ox-handicap': 'handicap',
        'ox-missions': 'missions',
        'ox-sante': 'sante',
        'ox-sport_animaux': 'sport_animaux',
        'ox-travail': 'travail',
        placeofbirth: placeofbirth,
        zipcode: zipcode,
      },
      reason,
      pdfBase,
    )

    downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`)
  }
}
