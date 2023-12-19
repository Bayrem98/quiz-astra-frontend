import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

const AccueilQuiz = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 10 }}>
        Pour commencer le quiz choissir un théme
      </h2>
      <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
        <Card
          style={{
            width: "20rem",
            marginRight: 50,
          }}
        >
          <img alt="." src="/image/astro-img-page.jpg" />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Astrologie
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <ButtonGroup>
              <Link to={"quizpageqcmtest/astrologie/qcm"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  QCM
                </Button>
              </Link>
              <Link to={"quizpagevftest/astrologie/vraifaux"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Vrai ou Faux
                </Button>
              </Link>
              <Link to={"quizpageqrtest/astrologie/questionreponse"}>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Q/Reponse
                </Button>
              </Link>
            </ButtonGroup>
          </CardBody>
        </Card>
        <Card
          style={{
            width: "20rem",
          }}
        >
          <img alt="." src="/image/nume-img-page.jpg" height={210} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Numérologie
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <ButtonGroup>
              <Link to={"quizpageqcmtest/numerologie/qcm"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  QCM
                </Button>
              </Link>
              <Link to={"quizpagevftest/numerologie/vraifaux"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Vrai ou Faux
                </Button>
              </Link>
              <Link to={"quizpageqrtest/numerologie/questionreponse"}>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Q/Reponse
                </Button>
              </Link>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <Card
          style={{
            width: "20rem",
            marginRight: 250,
          }}
        >
          <img alt="." src="/image/taro-img-page.jpg" height={210} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Tarologie
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <ButtonGroup>
              <Link to={"quizpageqcmtest/tarologie/qcm"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  QCM
                </Button>
              </Link>
              <Link to={"quizpagevftest/tarologie/vraifaux"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Vrai ou Faux
                </Button>
              </Link>
              <Link to={"quizpageqrtest/tarologie/questionreponse"}>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Q/Reponse
                </Button>
              </Link>
            </ButtonGroup>
          </CardBody>
        </Card>{" "}
        <Card
          style={{
            width: "20rem",
          }}
        >
          <img alt="." src="/image/cult-img-page.jpg" height={210} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Culture Général
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <ButtonGroup>
              <Link to={"quizpageqcmtest/culturegeneral/qcm"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  QCM
                </Button>
              </Link>
              <Link to={"quizpagevftest/culturegeneral/vraifaux"}>
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Vrai ou Faux
                </Button>
              </Link>
              <Link to={"quizpageqrtest/culturegeneral/questionreponse"}>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
                    color: "black",
                    fontSize: 14,
                  }}
                >
                  Q/Reponse
                </Button>
              </Link>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default AccueilQuiz;
