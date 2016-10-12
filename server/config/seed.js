/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Poll from '../api/poll/poll.model';


Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' +
             'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
  });

Poll.find({}).remove()
  .then(() => {
    Poll.create({
      title: 'Tipical families in UK',
      startDate: Date(),
      endDate: Date(),
      questions: [
        {
          text: 'What about your home?',
          type: 'a'
        }, {
          text: 'Who does work in your family?',
          type: 'c',
          options: [
            {
              text: "your father"
            }, {
              text: "your mother"
            }
          ]
        }, {
          text: 'How many people live in your house?',
          type: 'b',
          options: [
            {
              text: '1'
            },{
              text: 'more than 1'
            }
          ]
        }
      ]
    }, {
      title: 'Tipical teenagers habits.',
      startDate: Date(),
      endDate: Date(),
      questions: [
        {
          text: 'What about your tipical day?',
          type: 'a'
        }, {
          text: 'Do you play videogames?',
          type: 'b',
          options: [
            {
              text: "yes"
            }, {
              text: "no"
            }
          ]
        }, {
          text: 'Which activity do you hate between those listed belove?',
          type: 'c',
          options: [
            {
              text: 'sport'
            }, {
              text: 'going out'
            }, {
              text: 'playing videogames'
            }, {
              text: 'none'
            }
          ]
        }
      ]
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
