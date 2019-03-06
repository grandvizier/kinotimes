import FontAwesome from "react-fontawesome";
import { Row, Col } from "react-bootstrap";
import * as React from "react";
import classNames from "classnames";

export interface Props {
  filmDetails: any;
  imagePath: string;
  onFilmSave: () => void;
  onFilterClick: () => void;
  favorite: any;
  reviewed: boolean;
}

class FilmDetails extends React.PureComponent<Props> {
  render() {
    const {
      filmDetails,
      imagePath,
      onFilmSave,
      onFilterClick,
      favorite,
      reviewed
    } = this.props;

    let detailsStyle = classNames("allDetails small", { reviewed: !reviewed }); // if not reviewed, grey things out
    return (
      <Col xs={4} className={detailsStyle}>
        <Row>
          <Col xs={8} className="details">
            {filmDetails.genre}
          </Col>
          <span>{filmDetails.year}</span>
        </Row>
        <Row>
          <Col xs={8} className="details">
            {filmDetails.director ? "Director: " + filmDetails.director : null}
          </Col>
          <span>{filmDetails.rating}</span>
        </Row>
        <Row>
          <Col xs={12} className="details small">
            {filmDetails.actors}
          </Col>
          <span className="language">
            {filmDetails.language &&
            filmDetails.language.indexOf("English") !== -1
              ? null
              : filmDetails.language}
          </span>
        </Row>
        <Row>
          <Col xs={8} className="details">
            <em>{filmDetails.description}</em>
          </Col>
          <img
            className="img-responsive img-thumbnail pull-right"
            alt=""
            src={imagePath}
          />
        </Row>
        <Row className="filter favorite" onClick={onFilmSave}>
          <FontAwesome
            name={favorite ? "star" : "star-o"}
            className={favorite && "starred"}
          />
          <span className="filterText">{favorite ? "saved" : "save"}</span>
        </Row>
        <Row className="filter filterOut" onClick={onFilterClick}>
          <FontAwesome name="ban" />
          <span className="filterText">filter</span>
        </Row>
      </Col>
    );
  }
}

export default FilmDetails;
