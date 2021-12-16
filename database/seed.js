const { db , Models } = require('./index');

async function syncdb(){
    await db.sync({ force: true });
    // try {
    //     await seed();
    // } catch (e){
    //     console.error(e)
    // }
    console.log('done with sync');
    await db.close();
    console.log('connection closed')
}

async function seed(){

    const members = [
        { username: 'JediLord 5385'},
        { username: 'Kal El 0001' },
        { username: 'Batman 0002' },
        { username: 'Flash 0003' }
    ]

    for (let member of members){
        await Models.Member.create(member);
    }

    const club = await Models.Club.create({
        name: `Jordan's Test Server`,
        guildName: `Jordan's Test Server`,
        guildId: '919973809833013288'
    })

    const books = [
        { title: 'I hate Superman' , author: 'Lex Luthor', isbn: 1234567 },
        { title: 'I am the Night' , author: 'Batman', isbn: 1234567 },
        { title: 'Im from another universe' , author: 'Spiderman', isbn: 1234567 },
    ]

    for (let book of books){
        await Models.Book.create(book);
    }
    
    const member = await Models.Member.findByPk(1);
    const member2 = await Models.Member.findByPk(2);
    await club.addMember(member);
    await club.addMember(member2);
    
}

syncdb();