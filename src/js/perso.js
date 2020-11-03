import { downloadBlob } from './dom-utils'
import pdfBase from '../certificate.pdf'
import { generatePdf } from './pdf-util'

export async function generatePerso () {
  const creationInstant = new Date()
  const creationDate = creationInstant.toLocaleDateString('fr-CA')
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-')

  const urlParams = new URLSearchParams(window.location.search);

  if ( urlParams.has('a') &&
    urlParams.has('b') &&
    urlParams.has('c') &&
    urlParams.has('f') &&
    urlParams.has('l') &&
    urlParams.has('p') &&
    urlParams.has('z') &&
    urlParams.has('r')) {
    let address = urlParams.get('a')
    let birthday = urlParams.get('b')
    let city = urlParams.get('c')
    let firstname = urlParams.get('f')
    let lastname = urlParams.get('l')
    let placeofbirth = urlParams.get('p')
    let zipcode = urlParams.get('z')
    let reason = urlParams.get('r')

    const pdfBlob = await generatePdf(
      {
        address: address,
        birthday: birthday,
        city: city,
        datesortie: creationDate,
        firstname: firstname,
        heuresortie: creationHour,
        lastname: lastname,
        'ox-achats': "achats",
        'ox-convocation': "convocation",
        'ox-enfants': "enfants",
        'ox-famille': "famille",
        'ox-handicap': "handicap",
        'ox-missions': "missions",
        'ox-sante': "sante",
        'ox-sport_animaux': "sport_animaux",
        'ox-travail': "travail",
        placeofbirth: placeofbirth,
        zipcode: zipcode,
      },
      reason,
      pdfBase,
    )

    downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`)
  }
}
