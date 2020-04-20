import React, { Fragment, useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { TopicContext } from "../../contexts/topicContext";
import { VideoContext } from "../../contexts/videoContext";
import Video from "./Video";
import Topic from "./Topic";
import TopicQuiz from "../quizes/topicQuiz";
import { CourseContext } from "../../contexts/courseContext";
import AddTopic from "./addTopic";
import { AdminContext } from "../../contexts/adminContext";

const _displayTopicsVideos = (props) => {
  const { adminData } = useContext(AdminContext);
  const [selected, setSelection] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedQuiz, setSelectedQuiz] = useState();
  const { topics } = useContext(TopicContext);
  const { videos } = useContext(VideoContext);
  console.log(useContext(TopicContext));
  const { id } = props.match.params;
  console.log(selectedVideo);

  const displayVideo = async (video) => {
    await setSelectedVideo(video);
    await setSelection(true); //after the first render it became automatically false
  };

  const displayQuiz = async (quiz) => {
    await setSelectedQuiz(quiz);
    await setSelection(true);
  };
  var status;
  if (useContext(CourseContext).courses.errorCode === 300) {
    status = { text: "Error Deleting ", class: "text-danger" };
  }
  if (useContext(CourseContext).courses.errorCode === 400) {
    status = { text: "Deleted Successfully", class: "text-success" };
  } else {
    status = null;
  }
  console.log(useContext(CourseContext));
  console.log(status);

  return topics.topics != null ? (
    <Fragment>
      <Row>
        <Col>
          <div className="text-center">
            {" "}
            <h1 className="">
              <b>HEADER</b>
            </h1>
            {adminData.isAdmin ? <AddTopic id={id} /> : null}
            <div className={status && status.class}>
              {status && status.text}
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={5} className="bg-light">
          <h2 className="text-center mt-3">
            <b>Topics</b>
          </h2>
          {topics.topics &&
            topics.topics.map((topic) => {
              if (topic.courseId === id) {
                return (
                  <Topic
                    topic={topic}
                    key={topic.id}
                    videos={videos}
                    courseId={id}
                    displayVideo={displayVideo}
                    displayQuiz={displayQuiz}
                  />
                );
              }
            })}
        </Col>
        <Col md={6}>
          {selectedVideo != null && selected === true ? (
            <Video selectedVideo={selectedVideo} />
          ) : selected === true && selectedQuiz != null ? (
            <TopicQuiz selectedQuiz={selectedQuiz} />
          ) : null}
        </Col>
      </Row>
    </Fragment>
  ) : (
    <div>Loading....</div>
  );
};

export default _displayTopicsVideos;
