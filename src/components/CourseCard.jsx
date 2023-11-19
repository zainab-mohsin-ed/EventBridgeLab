import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AWS from 'aws-sdk';

export default function CourseCard({
  courseJSON, setField, setTitle, setUrl, setImgUrl, setId,
}) {
  const [editorMode, setEditorMode] = useState(false);
  const courseData = JSON.parse(courseJSON);

  var dynamoDB = new AWS.DynamoDB({
    region: 'us-east-1',
    accessKeyId: '<ACCESS_KEY>',
    secretAccessKey: '<SECRET_ACCESS_KEY>',
  });

  var tableName = "ClabTable";

  const enableEditor = () => {
    setEditorMode(true);
  };

  const disableEditor = () => {
    setEditorMode(false);
  };

  // Function to update GraphQL query parameters to trigger API call to edit course
  const confirmReview = (event) => {
    event.preventDefault();
    if (event.target[0].value
    ) {
      const id = (Math.floor(Math.random() * (999999 - 100 + 1) + 100)).toString();
      var params = {
        Item: {
          review_id: {
            S: id // Number value.
          },
          course_name: {
            S: courseData.CourseName // String value.
          },
          review: {
            S: event.target[0].value// String value.
          }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: tableName,
      };

      console.log(params)
      dynamoDB.putItem(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(data);
        }
      });
    }
    disableEditor()
  };

  if (editorMode) {
    return (
      <Col className="col-3" style={{ paddingBottom: '24px' }}>
        <Card>
          <Card.Img
            variant="top"
            src={courseData.ImageURL}
            alt="Image Not Found"
          />
          <Card.Header>{`Adding Review for: ${courseData.CourseName}`}</Card.Header>
          <Card.Body>
            <Form onSubmit={confirmReview}>
              <Container className="flex">
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea" // Use "textarea" for a larger text area
                    rows={5} // Specify the number of rows (adjust as needed)
                    placeholder="Write your review here"
                    aria-label="Course Title"
                    defaultValue={" "}
                  />
                </InputGroup>
                <Button className="button" onClick={disableEditor}>Discard Review</Button>
                <InputGroup className="mb-3">
                  <Button className="button" type="submit">Save Review</Button>
                </InputGroup>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    );
  }
  return (
    <Col className="col-3" style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Img
          variant="top"
          src={courseData.ImageURL}
          alt="Image Not Found"
        />
        <Card.Header>{courseData.CourseName}</Card.Header>
        <Card.Body>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip className="custom-tooltip" id="edit-tooltip" style={{ fontSize: '12px' }}>Edit Course</Tooltip>}
          >
            <Button variant="link" onClick={enableEditor} style={{ color: 'white', outline: null }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </Col>
  );
}

CourseCard.propTypes = {
  courseJSON: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  setImgUrl: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};