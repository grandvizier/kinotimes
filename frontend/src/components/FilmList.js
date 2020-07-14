import React from "react";
import PropTypes from "prop-types";
import Film from "./Film";

const FilmList = ({films, theaters, onFilterClick, onFilmSave}) => (
    <div>
        {films.map(film => {
            if (!film.hidden) {
                return (
                    <Film
                        key={film._id}
                        {...film}
                        theaters={theaters}
                        onFilterClick={() => onFilterClick(film._id)}
                        onFilmSave={() => onFilmSave(film._id)}
                    />
                );
            }
            return null;
        })}
    </div>
);

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
    theaters: PropTypes.object.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onFilmSave: PropTypes.func.isRequired
};

export default FilmList;
