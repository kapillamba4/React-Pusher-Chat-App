import React, {Component} from 'react';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'

class ChannelModal extends Component {
  state = {
    open: false,
    input: ''
  };

  constructor(props) {
    super();
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({
      input: e.target.value
    });
  }

  open() {
    this.setState({
      open: true,
      input: ''
    });
  }

  close() {
    this.setState({
      open: false,
      input: ''
    });
  }

  render() {
    const styles = {
      marginTop: 40,
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    return (
      <Modal trigger={this.props.triggerBtn} onOpen={this.open} open={this.state.open} onClose={this.close} basic size='small' style={styles}>
        <Header icon='archive' content={this.props.header} />
        <Modal.Content>
          <p>{this.props.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Input icon='users' inverted={true} onChange={this.handleInput} iconPosition='left' placeholder={this.props.inputFieldTxt} value={this.state.input} />
          <Button basic color='red' inverted onClick={this.close}>
            <Icon name='remove' /> {this.props.negativeBtnText}
          </Button>
          <Button color='green' inverted onClick={() => {this.props.handleSubmit(this.state.input); this.close()}}>
            <Icon name='checkmark' /> {this.props.positiveBtnText}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChannelModal;