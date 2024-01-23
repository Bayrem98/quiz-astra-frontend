import * as d3 from "d3";
import { getQuestions } from "../../actions/Questions/action";
import { useParams } from "react-router-dom";
import { Card } from "reactstrap";
import Question from "../../@types/Question";
import { useEffect, useRef, useState } from "react";

const Notifications = () => {
  let { categ } = useParams();
  let { quizTy } = useParams();
  const [Questions, setQuestions] = useState<Question[]>([]);
  const chartRef = useRef(null);

  useEffect(() => {
    getQuestions({ category: categ, quizType: quizTy }, setQuestions);
  }, [categ, quizTy]);

  useEffect(() => {
    // Fonction pour créer le diagramme à barres
    const createBarChart = (questionsData: Question[]) => {
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 30, bottom: 60, left: 60 };
      const width = 460 - margin.left - margin.right;
      const height = 460 - margin.top - margin.bottom;

      // Utiliser une fonction de regroupement pour compter le nombre de questions par catégorie et par type
      const groupedByCategory = d3.group(
        questionsData,
        (question) => question.category
      ) as Map<string, Question[]>;
      const groupedByType = d3.group(
        questionsData,
        (question) => question.quizType
      ) as Map<string, Question[]>;

      const categories = Array.from(groupedByCategory.keys()) as string[];
      const types = Array.from(groupedByType.keys());

      const colorScale = d3
        .scaleOrdinal<string>()
        .domain(categories.concat(types))
        .range(d3.schemeCategory10);

      const x = d3
        .scaleBand()
        .domain(categories)
        .range([-1, width])
        .padding(0.5);

      const y = d3.scaleBand().domain(types).range([height, 100]).padding(0.5);
      // Ajouter les axes x et y avec des étiquettes
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Catégorie");

      svg
        .append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("Type de Quiz");

      // Ajouter les barres
      svg
        .selectAll(".bar")
        .data(questionsData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (question: Question) => x(question.category) as number)
        .attr("width", x.bandwidth())
        .attr(
          "height",
          (question) =>
            y.bandwidth() *
            (groupedByCategory.get(question.category)?.length || 0)
        )
        .attr("y", (question: Question) => y(question.quizType) as number)
        .attr("fill", (question: Question) => colorScale(question.quizType));

      // Ajouter une légende pour les types uniquement
      svg
        .selectAll(".legendType")
        .data(types)
        .enter()
        .append("rect")
        .attr("class", "legendType")
        .attr("x", 20 + categories.length * -5)
        .attr("y", (_, i) => 20 + i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (type) => colorScale(type));

      svg
        .selectAll(".legendTypeText")
        .data(types)
        .enter()
        .append("text")
        .attr("class", "legendTypeText")
        .attr("x", 35 + categories.length * -5)
        .attr("y", (_, i) => 30 + i * 20)
        .text((type) => type);
    };

    // Appel de la fonction pour créer le diagramme à barres lorsque les questions changent
    createBarChart(Questions);
  }, [Questions]);

  return (
    <>
      <div className="background-app">
        <h4 style={{ paddingTop: 90, color: "white", textAlign: "center" }}>
          Diagrame pour les questions pour chaque catégorie par typeQuiz
        </h4>
        <div
          className="d-flex justify-content-center"
          style={{ paddingTop: 80, paddingBottom: 190 }}
        >
          <Card
            style={{
              height: 450,
              width: 500,
            }}
          >
            <svg
              style={{ paddingLeft: 10 }}
              ref={chartRef}
              width={400}
              height={400}
            ></svg>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Notifications;
