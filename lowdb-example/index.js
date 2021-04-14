const low = require('lowdb');
//Importera en adapter för att skriva synkront till databas för att undvika konflikter
const FileSync = require('lowdb/adapters/FileSync');

//Bestäm vilken JSON-fil som är vår databas, om den inte finns så skapas den av lowdb
const adapter = new FileSync('database.json');
//Koppla vår JSON-fil till lowdb
const database = low(adapter);


/** Frågor att ställa sig vid skapandet av databasen
 * Vad är databasen till för? Vad är dess syfte?
 * Vad vill vi spara för data?
 * Vad är det för typ av data vi vill spara? (Arrayer, nummer, strängar, booleans)
 */

/**
 * Vad är databasen till för? Vad är dess syfte?
 * Syftet är att spara användarkonton.
 * 
 * Vad vill vi spara för data?
 * Vi vill spara användarnamn och lösenord
 * 
 * Vad är det för typ av data vi vill spara? (Arrayer, nummer, strängar, booleans)
 * Det är en array med konton där varje konto är ett objekt
 * Exempel:
 *   accounts: [
 *       {
 *           username: 'Chris'
 *           password: 'pwd123'
 *       }
 *   ]
 */

database.defaults({ accounts: [], count: 0 }).write();

const account = {
  username: 'Chris',
  password: 'pwd123'
}

console.log(`Lägger till följande i databasen ${JSON.stringify(account)}`);
//Hämta arrayen accounts, lägg till ett nytt objekt och till sist skriv till databasen
database.get('accounts').push(account).write();

const accounts = database.get('accounts').value();
console.log(`Databasen innehåller: ${JSON.stringify(accounts)}`);

//Hämta arrayen accounts, leta upp det första objektet som har användarnamn Chris
//Uppdatera sedan med ett nytt värde och till sist skriv till databasen
database.get('accounts').find({ username: 'Chris' }).assign({ username: 'Ada' }).write();

const numberOfAccounts = database.get('accounts').value();
console.log(`Antal konton: ${numberOfAccounts.length}`);
database.set('count', numberOfAccounts.length).write();

const filterAccounts = database.get('accounts').filter({ username: 'Ada' }).value();
console.log(`filterAccounts: ${JSON.stringify(filterAccounts)}`);

//Hämta arrayen accounts, ta bort det objekt där användarnamn är lika med Test
//Till sist skriv till databasenH
database.get('accounts').remove({ usernamße: 'Test' }).write();