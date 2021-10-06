import React from 'react';
import EditStoryFormContainer from './forms/edit_story_form_container';

class StoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
    this.toggleDetails = this.toggleDetails.bind(this);
    this.startStory = this.startStory.bind(this);
    this.finishStory = this.finishStory.bind(this);

  }

  toggleDetails() {
    this.state.details ? this.setState({details: false}) : this.setState({details: true})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.story !== this.props.story) {
      this.setState({details: false})
    }
  }

  finishStory() {
    let { story, updateStory, currentUser } = this.props;
    updateStory({
      id: story.id,
      story_state: "Finished",
      assign_to: currentUser
    })
  }

  startStory() {
    let { story, updateStory, currentUser } = this.props;
    updateStory({
      id: story.id,
      story_state: "Started",
      assign_to: currentUser
    })
  }

  render() {
    let {storyType, title, assignedUser, storyState} = this.props.story;

    let assignmentButton = null;
    if (!assignedUser) {
      if (this.props.formType === "Icebox") {
        assignmentButton = (
          <button onClick={(id) =>this.props.iceboxAssign(id)}>Accept</button>
        )
      } else if (this.props.formType === "Backlog") {
        assignmentButton = (
          <button onClick={(id) =>this.props.backlogAssign(id)}>Accept</button>
        )
      }
    }

    let taskButton = null;
    if (this.props.formType === "MyWork") {
      storyState === "Unstarted" ? taskButton = (<button onClick={this.startStory}>Start</button>) : taskButton = (<button onClick={this.finishStory}>Finish</button>)
    }

    if (this.state.details === false ) {
      return (
        <div className="story-item-container">
          <div onClick={this.toggleDetails} className="story-item">
            <h1>{storyType + ":" + ` ${title}`}</h1>
          </div>
          {assignmentButton}
          {taskButton}
        </div>
      )
    } else {
      return (
        <div className="story-item-card">
          <button onClick={this.toggleDetails}>Collapse</button>
          <EditStoryFormContainer formType={this.props.formType} story={this.props.story}/>
        </div>
      )
    }
  }
}

export default StoryItem