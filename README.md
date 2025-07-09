# Sky Tv Skin

## Descrizione

Questo progetto nasce dall’esigenza di gestire la **navigazione a focus** in applicazioni React destinate a dispositivi come Smart TV (HbbTV, set-top box, ecc.), dove la navigazione tramite tastiera o telecomando è fondamentale.  
L’idea centrale è quella di modellare la UI come una gerarchia di **container** e **page**, ognuno dei quali può gestire il proprio focus, la propria logica di navigazione e la mappatura dei tasti.

## Concetti chiave

### Container

Un **container** rappresenta una sezione della UI che può ricevere il focus e gestire eventi di navigazione (es: una lista, un menu, una card).  
Ogni container:
- Si registra automaticamente all’interno di uno store globale (Zustand).
- Può definire una propria mappatura dei tasti (`keysRemapping`).
- Può esporre handler personalizzati per eventi di caricamento, scaricamento, ecc.

### Page

Una **page** è un caso particolare di container che si attiva automaticamente quando viene montata.  
Serve a rappresentare una schermata principale o una vista di alto livello, semplificando la gestione del focus e della navigazione tra le varie pagine dell’applicazione.

### Stack di navigazione

Lo store mantiene uno **stack** dei container attivi, permettendo di gestire la navigazione annidata (es: aprire un popup sopra una lista, poi tornare indietro).

### State management con Zustand

Tutta la logica di navigazione (container attivi, stack, handler, ecc.) è centralizzata in uno store Zustand, che garantisce:
- Performance
- Semplicità di accesso sia da React che da funzioni esterne
- Reference stabili per le funzioni di navigazione

### Logger

Il progetto include un semplice logger custom, che permette di abilitare/disabilitare facilmente i log in base all’ambiente, senza dipendenze esterne.

Mette a disposizione i seguenti metodi:

- log
- debug
- info
- error
- warn

---

## Come funziona

1. **Registrazione:**  
   Ogni container si registra nello store quando viene montato e si deregistra quando viene smontato.

2. **Gestione del focus:**  
   Lo store tiene traccia del container attivo e gestisce lo stack di navigazione.  
   Le page si attivano automaticamente.

3. **Gestione degli eventi:**  
   Gli eventi di tastiera vengono intercettati e gestiti dal container attivo, che può rimappare i tasti o delegare la gestione allo store.

4. **Navigazione:**  
   Puoi spostare il focus tra container, gestire la navigazione annidata (push/pop dello stack) e personalizzare la logica di navigazione tramite handler.

---

## Esempio d’uso

```tsx
import Container from "./components/Container";
import Page from "./components/Page";

const MyPage = () => (
  <Page id="mainPage">
    <Container id="menu" keysRemapping={{ ArrowDown: handleDown }}>
      {/* ...menu items... */}
    </Container>
    <Container id="content">
      {/* ...contenuto... */}
    </Container>
  </Page>
);
```

---

## Vantaggi

- **Nessuna dipendenza esterna per la navigazione:** solo Zustand e React.
- **Logica di navigazione centralizzata e testabile.**
- **Facile estensione:** puoi aggiungere nuovi tipi di container, handler, logica custom.
- **Adatto a UI complesse e navigazione a focus (TV, HbbTV, set-top box).**

---

## Come personalizzare

- **Aggiungi handler personalizzati** ai container per gestire eventi di caricamento/scaricamento.
- **Personalizza la mappatura dei tasti** tramite la prop `keysRemapping`.
- **Estendi il logger** per log più dettagliati o diversi livelli di log.

---

## Requisiti

- React 18+
- Zustand
- TypeScript

---

## Note finali

Questo progetto è pensato per essere una base solida per applicazioni React con navigazione a focus, ma può essere facilmente adattato anche ad altri contesti dove la gestione del focus e della navigazione è centrale.

---