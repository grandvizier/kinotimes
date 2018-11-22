// var db = new (require('../../core/Database.js'));
var filmModel = new (require('../../core/models/film'));

exports.getProjection = getProjection;

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql/type');


/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(function (projections, selection) {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var filmType = new GraphQLObjectType({
  name: 'Film',
  description: 'films with showtimes',
  fields: function fields() {
    return {
      title: {
        type: GraphQLString,
        description: 'The title of the film.'
      },
      originalID: {
        type: GraphQLString,
        description: 'The id from the original data source.'
      },
      img: {
        type: GraphQLString,
        description: 'The img of the film.'
      },
      imdbID: {
        type: GraphQLString,
        description: 'The imdb ID.'
      },
      reviewed: {
        type: GraphQLBoolean,
        description: 'Has been reviewed in the admin panel'
      }

    // details: {
    //   director: String,
    //   actors: String,
    //   description: String,
    //   rating: Number,
    //   year: String,
    //   genre: String,
    //   language: String,
    //   country: String,
    //   aka: String,
    // },

    // showtimes: { type: new GraphQLList(showtimeType) },

    };
  }
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      allFilms: {
        type: new GraphQLList(filmType),
        args: {
          imdbID: {
            name: 'imdbID',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        // resolve: async (parent, { id }, context, info) => {
        //   const result = await User.findById(id);
        //   return result.toObject();
        // },
        resolve: function resolve(root, _ref, source, fieldASTs) {
          var imdbID = _ref.imdbID;
          console.log(_ref);
          console.log(filmModel);

          var projections = getProjection(fieldASTs);
          var foundItems = new Promise(function (resolve, reject) {
            filmModel.find({imdbID: imdbID}, projections, function (err, films) {
              err ? reject(err) : resolve(films);
            });
          });

          return foundItems;
        }
      },
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

module.exports = schema;
