import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

const AccueilQuiz = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 50 }}>
        Pour commencer le quiz choissir un théme
      </h2>
      <div
        className="d-flex justify-content-between"
        style={{ marginLeft: 10, marginRight: 10, marginTop: 100 }}
      >
        <Card
          style={{
            width: "18rem",
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
            <Link to={"quizpage/astro"}>
              <Button
                style={{
                  marginLeft: 70,
                  marginTop: 20,
                  borderRadius: 20,
                  backgroundColor: "lightgray",
                  color: "black",
                }}
              >
                Commencer
              </Button>
            </Link>
          </CardBody>
        </Card>
        <Card
          style={{
            width: "18rem",
          }}
        >
          <img alt="." src="/image/nume-img-page.jpg" height={190} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Numérologie
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <Link to={"quizpage/numerolo"}>
              <Button
                style={{
                  marginLeft: 70,
                  marginTop: 20,
                  borderRadius: 20,
                  backgroundColor: "lightgray",
                  color: "black",
                }}
              >
                Commencer
              </Button>
            </Link>
          </CardBody>
        </Card>{" "}
        <Card
          style={{
            width: "18rem",
          }}
        >
          <img alt="." src="/image/taro-img-page.jpg" height={190} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Tarologie
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <Link to={"quizpage/taro"}>
              <Button
                style={{
                  marginLeft: 70,
                  marginTop: 20,
                  borderRadius: 20,
                  backgroundColor: "lightgray",
                  color: "black",
                }}
              >
                Commencer
              </Button>
            </Link>
          </CardBody>
        </Card>{" "}
        <Card
          style={{
            width: "18rem",
          }}
        >
          <img alt="." src="/image/cult-img-page.jpg" height={190} />
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Culture Général
            </CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card‘s content.
            </CardText>
            <Link to={"quizpage/cult"}>
              <Button
                style={{
                  marginLeft: 70,
                  marginTop: 20,
                  borderRadius: 20,
                  backgroundColor: "lightgray",
                  color: "black",
                }}
              >
                Commencer
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default AccueilQuiz;
