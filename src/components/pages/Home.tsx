import { Card, CardBody, CardHeader } from "reactstrap";

const Home = () => {
  return (
    <>
      <div className="background-app d-flex justify-content-center">
        <div style={{height: "100vh"}}>
          <Card
            outline
            style={{
              width: "50rem",
              backgroundColor: "gray",
              color: "white",
              border: 0,
              fontSize: 20,
              marginTop: 150,
            }}
          >
            <CardHeader
              style={{
                textAlign: "center",
                backgroundColor: "#6c757d",
                color: "white",
                fontSize: 28,
              }}
            >
              <h1 className="animated-gradient-text-home">
                DESCRIPTION NOTRE APPLICATION
              </h1>
            </CardHeader>
            <CardBody>
              Notre application de quiz est conçue pour les amateurs de culture
              ésotérique et de culture générale. Elle est composée de quatre
              catégories distinctes de questions pour tester vos connaissances
              et votre intuition. La première catégorie,{" "}
              <span className="animated-gradient-text">"Astrologie"</span>, vous
              propose des questions sur les signes du zodiaque, les planètes,
              les maisons astrologiques, les transits, etc. La deuxième
              catégorie,
              <span className="animated-gradient-text1">"Numérologie"</span>,
              vous invite à découvrir les secrets des nombres, des cycles de
              vie, des nombres de destinée, des nombres karmiques, etc. La
              troisième catégorie,{" "}
              <span className="animated-gradient-text2">"Tarologie"</span>, vous
              offre des questions sur les arcanes majeurs et mineurs du tarot,
              les différentes méthodes de tirage, les significations
              symboliques, etc. Enfin, la catégorie{" "}
              <span className="animated-gradient-text3">
                "Culture Générale"
              </span>
              , vous permet de tester vos connaissances sur divers sujets tels
              que l'histoire, la géographie, la littérature, les sciences, etc.
              Nous sommes convaincus que vous apprécierez cette application
              ludique et instructive qui vous permettra de vous divertir tout en
              enrichissant votre culture personnelle.
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
