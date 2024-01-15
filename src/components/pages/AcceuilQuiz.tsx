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
      <div
        style={{
          backgroundImage: "url(/image/background-home.jpg)",
          backgroundSize: "cover",
        }}
      >
        {" "}
        <h2 className="animated-gradient-text">
          Pour commencer le quiz choissir un théme
        </h2>
        <div className="d-flex justify-content-center">
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
              <CardText style={{ fontSize: 13, textAlign: "justify" }}>
                Explorez les mystères du cosmos avec notre quiz d'astrologie.
                Plongez dans l'univers des signes zodiacaux, des planètes et des
                maisons astrologiques. Testez vos connaissances sur les
                caractéristiques associées à chaque signe, découvrez l'influence
                des planètes et défiez-vous avec des questions stimulantes sur
                l'astrologie.
              </CardText>
              <ButtonGroup style={{ paddingTop: 16 }}>
                <Link to={"quizpageqcmtest/astrologie/qcm"}>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 10,
                      borderRadius: 20,
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
              <CardText style={{ fontSize: 13, textAlign: "justify" }}>
                Découvrez les secrets cachés derrière les nombres avec notre
                quiz de numérologie. Apprenez comment les chiffres peuvent
                révéler des aspects fascinants de votre personnalité et de votre
                destinée. Testez vos compétences en calculant des nombres de
                destinée et en explorant les significations cachées derrière
                chaque chiffre dans ce quiz captivant.
              </CardText>
              <ButtonGroup>
                <Link to={"quizpageqcmtest/numerologie/qcm"}>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 10,
                      borderRadius: 20,
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
          style={{ marginTop: 50 }}
        >
          <Card
            style={{
              width: "20rem",
              marginRight: 250,
              marginBottom: 50,
            }}
          >
            <img alt="." src="/image/taro-img-page.jpg" height={210} />
            <CardBody>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Tarologie
              </CardTitle>
              <CardText style={{ fontSize: 13, textAlign: "justify" }}>
                Plongez dans l'univers mystique de la tarologie avec notre quiz
                dédié. Explorez les arcanes majeurs et mineurs, apprenez à
                interpréter les cartes et découvrez les significations
                symboliques qui se cachent derrière chaque image. Mettez à
                l'épreuve votre connaissance des jeux de tarot et défiez-vous
                avec des questions intrigantes.
              </CardText>
              <ButtonGroup style={{ paddingTop: 19 }}>
                <Link to={"quizpageqcmtest/tarologie/qcm"}>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 10,
                      borderRadius: 20,
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
              marginBottom: 50,
            }}
          >
            <img alt="." src="/image/cult-img-page.jpg" height={210} />
            <CardBody>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                Culture Général
              </CardTitle>
              <CardText style={{ fontSize: 13, textAlign: "justify" }}>
                Élargissez vos horizons avec notre quiz de culture générale.
                Explorez un éventail de sujets allant de la géographie à
                l'histoire, des arts à la science. Testez vos connaissances sur
                des faits divers et apprenez de nouvelles informations
                captivantes. Que vous soyez passionné par la littérature, la
                science ou l'histoire, ce quiz offre une expérience variée pour
                stimuler votre esprit.
              </CardText>
              <ButtonGroup>
                <Link to={"quizpageqcmtest/culturegeneral/qcm"}>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 10,
                      borderRadius: 20,
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
                      backgroundColor: "#6c757d",
                      color: "white",
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
      </div>
    </>
  );
};
export default AccueilQuiz;
