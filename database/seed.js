const { db } = require('./index');

async function syncdb(){
    await db.sync({ force: true });
    console.log('done with sync');
    await db.close();
    console.log('connection closed')
}

syncdb();