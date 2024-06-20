# Voice Command

Voice Command è un'applicazione per simulare e testare comandi vocali.

## Funzionalità

### Comandi Disponibili

Nella HomePage, è possibile utilizzare una serie di comandi per interagire con l'applicazione. Ecco una breve descrizione dei comandi:

- **Pulsante Keyboard**: Attiva il log, registrando l'orario, il pulsante premuto e la durata della pressione.
- **Click Sinistro del Mouse**: Avanza nelle frasi.
- **Click Destro del Mouse**: Genera una risposta con un ritardo casuale.

## Pagine

L'applicazione dispone di due pagine principali:

### [HomePage](https://alex-citeroni.github.io/VoiceCommand/)

La pagina iniziale dove puoi testare i comandi vocali.

### [Logs](https://alex-citeroni.github.io/VoiceCommand/#/logs)

Una pagina dedicata alla visualizzazione dei log. Qui puoi anche scaricare o cancellare i log registrati.

## Installazione

Per eseguire l'applicazione localmente:

1. Clona il repository:
    ```sh
    git clone https://github.com/alex-citeroni/VoiceCommand.git
    ```
2. Installa le dipendenze:
    ```sh
    cd VoiceCommand
    npm install
    ```
3. Avvia l'applicazione:
    ```sh
    npm start
    ```

## Deploy su GitHub Pages

Per effettuare il deploy dell'applicazione su GitHub Pages, esegui i seguenti comandi:

1. Configura la proprietà `homepage` nel `package.json`:
    ```json
    "homepage": "https://alex-citeroni.github.io/VoiceCommand",
    ```
2. Installa il pacchetto `gh-pages` se non l'hai già fatto:
    ```sh
    npm install --save gh-pages
    ```
3. Aggiungi gli script di deploy nel `package.json`:
    ```json
    "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",
        ...
    }
    ```
4. Esegui il deploy:
    ```sh
    npm run deploy
    ```

Ora l'applicazione sarà disponibile su GitHub Pages all'indirizzo indicato nella proprietà `homepage`.

## Contributi

Contributi e suggerimenti sono i benvenuti! Puoi aprire un'issue o una pull request per contribuire al progetto.


---
