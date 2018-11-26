const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql/type');


import filmModel from '../../core/models/film'

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
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
        resolve: function resolve(root, _ref, source, fieldASTs) {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise(function (resolve, reject) {
            filmModel.find({imdbID: _ref.imdbID}, projections, function (err, films) {
              err ? reject(err) : resolve(films);
            });
          });

          return foundItems;
        }
      }
    }
  })
});

module.exports = schema;
