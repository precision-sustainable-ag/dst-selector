import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header/header";
import { Box, Typography } from "@material-ui/core";
import Scrollspy from "react-scrollspy";
import { HashLink } from "react-router-hash-link";
import "../../styles/about.scss";
const tableStyles = {
  td: {
    fontSize: "1em",
    padding: "0.1em",
  },
};

const boxWrapper = {
  paddingBottom: "0px",
  marginBottom: "50px",
  backgroundColor: "rgba(240,247,235,.8)",
  borderRadius: "10px",
  border: "1px solid #598445",
};
const About = (props) => {
  // const [state, dispatch] = useContext(Context);
  const [calcHeight, setCalcHeight] = useState(0);
  const backgroundWrapper = {
    background: `url(${props.bg})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    paddingLeft: "0px",
    paddingRight: "0px",
  };
  useEffect(() => {
    let parentDocHeight = document
      .getElementById("mainContentWrapper")
      .getBoundingClientRect().height;
    let headerHeight = document.querySelector("header").getBoundingClientRect()
      .height;

    let calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);
  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid">
        <div className="row" style={{ minHeight: calcHeight }}>
          <div className="col-4">
            <Scrollspy
              className="scrollspy col-6"
              items={[
                "section-1",
                "section-2",
                "section-3",
                "section-4",
                "section-5",
              ]}
              currentClassName="isCurrent"
            >
              <li>
                <a href="#section-1">
                  History and Purpose of the NECCC Tool Effort
                </a>
              </li>
              <li>
                <a href="#section-2">Cover Crop Dat</a>
              </li>
              <li>
                <a href="#section-3">section 3</a>
              </li>
              <li>
                <a href="#section-4">section 4</a>
              </li>
              <li>
                <a href="#section-5">section 5</a>
              </li>
            </Scrollspy>
          </div>
          <div className="col-8">
            <div className="scrollcontainer">
              <div>
                <section id="section-1">
                  <h2>History and Purpose of the NECCC Tool Effort</h2>
                  <p>
                    A diverse group crop of stakeholders including farmers,
                    researchers, and personnel from agribusinesses and NGOs
                    united in 2016 to form the Northeast Cover Crops Council
                    (NECCC). As part of our mission to support and promote the
                    adoption of cover crops, we foster the exchange of
                    information, inspiration, and outcome-based research. In
                    practice this means the collation of existing educational
                    products and the creation of new products to fill knowledge
                    gaps. Stakeholders identified a lack ofneed for
                    site-specific information and recommendations as a barrier
                    to cover crop adoption. Therefore, the first outreach
                    product we targeted was adaptation of the Midwest Cover
                    Crops Council’s cover crop species selector tool for use in
                    the Northeast. This initiative led to the formation of a
                    Species Selector Product team consisting of agronomists,
                    informatics researchers, and developers, as well as four
                    Cover Crop Data Verification teams, consisting of
                    approximately 35 NECCC members.
                  </p>
                </section>
                <section id="section-2">
                  <h2>Cover Crop Data</h2>
                  <p>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum. Why do we use it? It is a long established fact that
                    a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem
                    Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here',
                    making it look like readable English. Many desktop
                    publishing packages and web page editors now use Lorem Ipsum
                    as their default model text, and a search for 'lorem ipsum'
                    will uncover many web sites still in their infancy. Various
                    versions have evolved over the years, sometimes by accident,
                    sometimes on purpose (injected humour and the like). Where
                    does it come from? Contrary to popular belief, Lorem Ipsum
                    is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000
                    years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one of the
                    more obscure Latin words, consectetur, from a Lorem Ipsum
                    passage, and going through the cites of the word in
                    classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                    Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                    by Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32. The standard chunk of
                    Lorem Ipsum used since the 1500s is reproduced below for
                    those interested. Sections 1.10.32 and 1.10.33 from "de
                    Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions
                    from the 1914 translation by H. Rackham. Where can I get
                    some? There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc.
                  </p>
                </section>
                <section id="section-3">
                  <h2>Section 3</h2>
                  <p>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum. Why do we use it? It is a long established fact that
                    a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem
                    Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here',
                    making it look like readable English. Many desktop
                    publishing packages and web page editors now use Lorem Ipsum
                    as their default model text, and a search for 'lorem ipsum'
                    will uncover many web sites still in their infancy. Various
                    versions have evolved over the years, sometimes by accident,
                    sometimes on purpose (injected humour and the like). Where
                    does it come from? Contrary to popular belief, Lorem Ipsum
                    is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000
                    years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one of the
                    more obscure Latin words, consectetur, from a Lorem Ipsum
                    passage, and going through the cites of the word in
                    classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                    Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                    by Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32. The standard chunk of
                    Lorem Ipsum used since the 1500s is reproduced below for
                    those interested. Sections 1.10.32 and 1.10.33 from "de
                    Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions
                    from the 1914 translation by H. Rackham. Where can I get
                    some? There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc.
                  </p>
                </section>
                <section id="section-4">
                  <h2>Section 4</h2>
                  <p>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum. Why do we use it? It is a long established fact that
                    a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem
                    Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here',
                    making it look like readable English. Many desktop
                    publishing packages and web page editors now use Lorem Ipsum
                    as their default model text, and a search for 'lorem ipsum'
                    will uncover many web sites still in their infancy. Various
                    versions have evolved over the years, sometimes by accident,
                    sometimes on purpose (injected humour and the like). Where
                    does it come from? Contrary to popular belief, Lorem Ipsum
                    is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000
                    years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one of the
                    more obscure Latin words, consectetur, from a Lorem Ipsum
                    passage, and going through the cites of the word in
                    classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                    Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                    by Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32. The standard chunk of
                    Lorem Ipsum used since the 1500s is reproduced below for
                    those interested. Sections 1.10.32 and 1.10.33 from "de
                    Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions
                    from the 1914 translation by H. Rackham. Where can I get
                    some? There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc.
                  </p>
                </section>
                <section id="section-5">
                  <h2>Section 5</h2>
                  <p>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum. Why do we use it? It is a long established fact that
                    a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem
                    Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here',
                    making it look like readable English. Many desktop
                    publishing packages and web page editors now use Lorem Ipsum
                    as their default model text, and a search for 'lorem ipsum'
                    will uncover many web sites still in their infancy. Various
                    versions have evolved over the years, sometimes by accident,
                    sometimes on purpose (injected humour and the like). Where
                    does it come from? Contrary to popular belief, Lorem Ipsum
                    is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000
                    years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one of the
                    more obscure Latin words, consectetur, from a Lorem Ipsum
                    passage, and going through the cites of the word in
                    classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                    Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                    by Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32. The standard chunk of
                    Lorem Ipsum used since the 1500s is reproduced below for
                    those interested. Sections 1.10.32 and 1.10.33 from "de
                    Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions
                    from the 1914 translation by H. Rackham. Where can I get
                    some? There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
