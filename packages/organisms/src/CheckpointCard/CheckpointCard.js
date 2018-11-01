import React, { Component } from "react";
import PropTypes from "prop-types";
import { identity } from "ramda";
import { Header, ExpandableCard as Card } from "@offcourse/molecules";
import { Link, Group, Checkbox } from "@offcourse/atoms";
import { Meta } from "./sections";
import { sizes } from "@offcourse/constants";

const { LARGE } = sizes;
export default class CheckpointCard extends Component {
  static propTypes = {
    checkpoint: PropTypes.object,
    onCheckpointClick: PropTypes.func,
    onCourseClick: PropTypes.func,
    onCheckpointToggle: PropTypes.func,
    checkable: PropTypes.bool,
    layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    level: PropTypes.number,
    status: PropTypes.string
  };

  static defaultProps = {
    level: 1,
    onCheckpointClick: identity,
    onCheckpointToggle: identity,
    layout: [["header"], ["header", "meta"], ["breadcrumbs", "meta"]]
  };

  handleCourseClick = () => {
    const { onCourseClick, checkpoint } = this.props;
    const { course } = checkpoint;
    const { goal, curator } = course;
    onCourseClick({ goal, curator });
  };
  handleCheckpointClick = () => {
    const { onCheckpointClick, checkpoint } = this.props;
    const { task, course } = checkpoint;
    const { goal, curator } = course;
    onCheckpointClick({ goal, task, curator });
  };

  handleCheckpointToggle = ({ checked }) => {
    const { onCheckpointToggle, checkpoint } = this.props;
    const { task, course, checkpointId } = checkpoint;
    const { courseId, goal } = course;
    onCheckpointToggle({
      courseId,
      checkpointId,
      goal,
      task,
      checked
    });
  };

  render() {
    const { status, checkable, checkpoint, level, layout } = this.props;
    const {
      course,
      tags,
      task,
      resource,
      completed,
      checkpointId
    } = checkpoint;

    return (
      <Card
        key={`${checkpointId}-${completed}`}
        layout={layout}
        initialLevel={level}
        expandable={false}
        pt={0}
        px={0}
        inactive={level === 0 || status === "loading"}
        mb={6}
      >
        <Group pb={0} section="breadcrumbs" alignItems="stretch">
          <Group pb="0.5rem" display={["flex", "none", "none"]} px={6}>
            <Link
              onClick={this.handleCourseClick}
              fontFamily="base"
              basic
            >{`<< ${course.goal}`}</Link>
          </Group>
          <Header
            section="header"
            bg={["grayScale.1", "white", "white"]}
            onClick={this.handleCheckpointClick}
            pt={0}
            pb={0}
            p={6}
            icon={
              checkable && (
                <Checkbox
                  size={LARGE}
                  bg={["white", "grayScale.1", "grayScale.1"]}
                  checked={completed}
                  onToggle={this.handleCheckpointToggle}
                />
              )
            }
          >
            {task}
          </Header>
        </Group>
        <Header
          section="header"
          bg={["grayScale.1", "white", "white"]}
          onClick={this.handleCheckpointClick}
          pt={0}
          pb={0}
          p={6}
          icon={
            checkable && (
              <Checkbox
                size={LARGE}
                bg={["white", "grayScale.1", "grayScale.1"]}
                checked={completed}
                onToggle={this.handleCheckpointToggle}
              />
            )
          }
        >
          {task}
        </Header>
        <Meta
          section="meta"
          resourceType={resource ? resource.resourceType : "unknown"}
          tags={tags || []}
        />
      </Card>
    );
  }
}
