const Sequelize = require("sequelize");

const db = new Sequelize('postgres://postgres@localhost:5432/BookClub');

const Member = db.define('member', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING
    },
    isbn: {
        type: Sequelize.INTEGER
    }
});

const Club = db.define('club', {
    name: {
        type: Sequelize.STRING
    }
});

Member.belongsToMany(Club, { through: "member_club"});
Club.belongsToMany(Member, { through: "member_club"});

Member.belongsToMany(Book, { through: "member_book" });
Book.belongsToMany(Member, { through: "member_book" });

Book.belongsToMany(Club, { through: "book_club" });
Club.belongsToMany(Book, { through: "book_club" });


module.exports = {
    db,
    Member,
    Book,
    Club
}