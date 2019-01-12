const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql/type');


import filmModel from '../../core/models/film'
import showtimeModel from '../../core/models/showtime'

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
      },
      // details: { type: new GraphQLObjectType(filmDetails) }

      showtimes: { type: new GraphQLList(showtimeType) },

    };
  }
});

var filmDetails = new GraphQLObjectType({
  name: 'FilmDetails',
  description: 'film details',
  fields: function fields() {
    return {
      director: {
        type: GraphQLString,
        description: 'The director of the film.'
      },
      actors: {
        type: GraphQLString,
        description: 'TODO: currently string of actors, should be array.'
      },
      description: {
        type: GraphQLString,
        description: 'The description of the film.'
      },
      genre: {
        type: GraphQLString,
        description: 'TODO: currently string of genres, should be an array.'
      },
      aka: {
        type: GraphQLString,
        description: 'English title of the film, if different from listing'
      }
      // rating: { type: new GraphQLList(filmRating) }

    //   year: String,
    //   language: String,
    //   country: String,
    // },
    };
  }
});

var showtimeType = new GraphQLObjectType({
  name: 'Showtimes',
  description: 'showtime info for a film',
  fields: function fields() {
    return {
      timestamp: {
        type: GraphQLInt,
        description: 'The timestamp of when the film is playing.'
      }
    };
  }
});

var filmRating = new GraphQLObjectType({
  name: 'FilmRating',
  description: 'ratings of the film (only imdb now)',
  fields: function fields() {
    return {
      imdb: {
        type: GraphQLFloat,
        description: 'The imdb rating.'
      }
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
