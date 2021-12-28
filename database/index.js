const { SlashCommandBuilder } = require("@discordjs/builders");
const Sequelize = require("sequelize");

if (process.env.DATABASE_URL) {
    config.dialectOptions = {
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

const db = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost:5432/BookClub', { logging: false });

const Member = db.define('member', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING
    },
    isbn: {
        type: Sequelize.STRING
    },
    search: {
        type: Sequelize.STRING
    }
});

const Club = db.define('club', {
    name: {
        type: Sequelize.STRING
    },
    guildName: {
        type: Sequelize.STRING
    },
    guildId: {
        type: Sequelize.STRING,
        unique: true
    },
    meeting: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.TEXT
    }
});

const ClubBooks = db.define('book_club', {
    queue: {
        type: Sequelize.INTEGER,
    },
    current: {
        type: Sequelize.BOOLEAN,
        defualtValue: false
    }
})


Member.belongsToMany(Club, { through: "member_club"});
Club.belongsToMany(Member, { through: "member_club"});

Member.belongsToMany(Book, { through: "member_book" });
Book.belongsToMany(Member, { through: "member_book" });

Book.belongsToMany(Club, { through: "book_club" });
Club.belongsToMany(Book, { through: "book_club" });



module.exports = {
    db,
    Models: {
        Member,
        Book,
        Club,
        ClubBooks
    }
}