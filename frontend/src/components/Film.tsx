import * as React from "react";
import { Panel } from "react-bootstrap";
import MapShowtimes from "../containers/MapShowtimes";
import FilmDetails from "./FilmDetails";
import "./Film.css";
import { ShowTime } from "../types";

export interface Props {
  onFilterClick: () => void;
  onFilmSave: () => void;
  title: string;
  imdbID: string;
  img: string;
  // what is details reviewed and favorite type
  details: any;
  showtimes: ShowTime[];
  reviewed: boolean;
  favorite: any;
}

export interface State {
  expand: boolean;
}

class Film extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { expand: true };
  }
  onPanelClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  render() {
    const {
      onFilterClick,
      onFilmSave,
      title,
      imdbID,
      img,
      details,
      showtimes,
      reviewed,
      favorite
    } = this.props;

    let filmDetails = details ? details : {};
    let imagePath = img !== "N/A" ? img : "/image_not_found.jpg";
    // don't show films if there's no times to display
    if (!showtimes.length) {
      return null;
    }
    let detailsStyle = "allDetails small" + (reviewed ? "" : " reviewed"); // the reviewed class greys things out
    return (
      <Panel
        className={`filmPanel ${this.state.expand ? "expand" : ""}`}
        onClick={this.onPanelClick}
      >
        <Panel.Heading>
          <Panel.Title componentClass="h3">{title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {filmDetails.aka && <div className="altTitle">{filmDetails.aka}</div>}
          <FilmDetails
            detailsStyle={detailsStyle}
            filmDetails={filmDetails}
            imagePath={imagePath}
            onFilmSave={onFilmSave}
            onFilterClick={onFilterClick}
            favorite={favorite}
          />
          <div className="panel-body col-xs-8">
            <div className="panel panel-info">
              <MapShowtimes showtimes={showtimes} />
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Film;
