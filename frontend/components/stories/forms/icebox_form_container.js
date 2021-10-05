import { connect } from "react-redux";
import { assignBacklogStory, clearStoryErrors, createNewStory } from "../../../actions/stories";
import StoryForm from "./story_form";

const mapStateToProps = (state, ownProps) => ({
  priority: false,
  currentUser: state.entities.users[state.session.currentUser],
  projectId: ownProps.projectId,
  formType: "Icebox",
  teamMembers: Object.values(state.entities.users),
  errors: state.ui.errors.storyErrors
})

const mapDispatchToProps = dispatch => ({
  createStory: story => dispatch(createNewStory(story)),
  assignStory: (storyId) => dispatch(assignBacklogStory(storyId)),
  clearErrors: () => dispatch(clearStoryErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);