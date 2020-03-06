## Kuvaus

Tabletop stats on sovellus, jolla voidaan katsella pelaajien suoriutumisia lautapeleissä. Kirjautuneena käyttäjänä sovellukseen voi lisätä pelejä ja niille matseja. Matsien lisäyksessä valitaan osallistuvat pelaajat ja niiden pisteet. Sovellus tallentaa tiedot MongoDB-tietokantaan ja laskee näiden mukaan tilastot peli- sekä pelaajakohtaisesti.

Tällä hetkellä sovelluksen frontendiin ei ole tehty rekisteröitymistä. Tietojen lisäämistä varten on tehty yksi admin-käyttäjä, jolla voi testata tietojen lisäämistä:

Username = mestari
Password = salainen
  
Sovellus on testattavissa osoitteessa https://frozen-dusk-07136.herokuapp.com/

Sovelluksen backend: https://github.com/Torppe/tabletop-stats-backend

# työaikakirjanpito

| Päivä      | Aika  | Mitä tein                                                                                                                   |
|------------|-------|-----------------------------------------------------------------------------------------------------------------------------|
| 28.12.2019 | 6     | sovelluksen suunnittelua. Tyyliframeworkeihin tutustumista                                                                  |
| 29.12.2019 | 4     | material ui:hin tutustumista ja repon luonti                                                                                |
| 1.1.2020   | 6     | sovelluksen pohja tehty. Linkit games- ja stats-osioon. Tilastokirjaston roughvizin kokeilua                                |
| 2.1.2020   | 6     | pelien lisäys. Voittojen lisäys ja vähennys. Pelikohtainen näkymä. Voittojen statistiikan näyttäminen. Teeman muokkaamista. |
| 4.1.2020   | 4     | Matsien lisäys peleille. Refaktorointia. Duplikaatti id:n poisto                                                            |
| 5.1.2020   | 5     | Matsien datan käsittely tilastokomponenttiin. Tilastojen tyylin suunnittelua. Voittojen keskiarvon lisääminen.              |
| 6.1.2020   | 1     | Bugien korjailua matsin lisäämisessä.                                                                                       |
|            | 2     | Duplikaattipelaaja matsin lisäämisessä korjattu. Pientä refaktorointia                                                      |
| 7.1.2020   | 3     | Tyylin muokkaamista matsin lisäyksessä                                                                                      |
| 8.1.2020   | 4     | Backendin luonti ja datan siirto backendiin                                                                                 |
|            | 2     | frontendin integraatio backendiin                                                                                           |
|            | 0,5   | Frontendin pelinlisäyslogiikka backendin kautta                                                                             |
|            | 1     | Frontendin matsien haku backendin kautta                                                                                    |
|            | 2     | MongoDB:n luonti. Skeemojen luonti.                                                                                         |
|            | 3     | MongoDB integraatio backendiin ja build herokuun                                                                            |
| 9.1.2020   | 2     | skeemojen muokkausta ja refaktorointia                                                                                      |
|            | 2     | testailua                                                                                                                   |
| 12.1.2020  | 1     | skeemojen muokkausta                                                                                                        |
|            | 1     | playereiden haku backendistä                                                                                                |
|            | 1     | refaktoroitu statistiikkanäkymää ja lisätty eniten pisteitä saaneen pelaajan näyttö                                         |
| 14.1.2020  | 1     | mongoosen populointia                                                                                                       |
|            | 4     | tappelua bugin kanssa                                                                                                       |
|            | 1     | bugin korjaus (populate saveen)                                                                                             |
|            | 1     | eniten voittoja saanut pelaaja statseihin                                                                                   |
|            | 1     | matsien lisäyksen tyylin muutosta responsiivisemmaksi                                                                       |
| 15.1.2020  | 2     | lintin ja helmetin lisäys sekä refaktorointia                                                                               |
| 17.1.2020  | 4     | Teeman suunnittelua UXPinin avulla                                                                                          |
| 18.1.2020  | 3     | Teeman toteuttamista frontendiin                                                                                            |
| 20.1.2020  | 3     | Teeman toteuttamista frontendiin                                                                                            |
|            | 3     | Käyttäjän lisääminen ja käyttäjän autentikaatio pelin lisäykseen                                                            |
| 22.1.2020  | 2     | Autentikointi post- ja delete-kutsuihin sekä refaktorointia                                                                 |
|            | 3     | Kirjautuminen ja autentikoiminen lisätty frontendiin                                                                        |
|            | 3     | kirjautumissivun tyylin muokkausta                                                                                          |
|            | 1     | testailua                                                                                                                   |
| 25.1.2020  | 5     | Bugien korjailua, nice to have featureita, responsiivinen login screen, refactorointia                                      |
|            | 1     | Pelaajakohtaisten tilastojen pohja                                                                                          |
| 26.1.2020  | 2     | Matsien haku pelaajan mukaan                                                                                                |
|            | 3     | Pelaajan kokonais- ja pelikohtaisten tilastojen näyttäminen ja refactorointia                                               |
| 27.1.2020  | 3     | Logon suunnittelu ja toteutus. Logon lisääminen. Tilastojen asettelua                                                       |
| 5.3.2020   | 3     | Matsihistorian lisäys. Muutettu matsien skeemaa niin, että voittajalle on oma tieto erikseen.                               |
|            |       |                                                                                                                             |
| yhteensä   | 105,5 |                                                                                                                             |


