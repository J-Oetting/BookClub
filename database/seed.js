const { db, Member, Book, Club} = require('./index');

async function syncdb(){
    await db.sync();
    console.log('done with sync');
    await db.close();
    console.log('connection closed')
}

syncdb();