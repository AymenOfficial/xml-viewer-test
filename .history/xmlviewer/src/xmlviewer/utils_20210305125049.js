import React from 'react';
import PropTypes from 'prop-types';
import Attributes from './attributes';

const TextElement = ({ text, theme }) => {
  const overflow = theme.overflowBreak
    ? { overflowWrap: 'break-word', whiteSpace: 'normal' }
    : {};
  return <span style={{ color: theme.textColor, ...overflow }}>{text}</span>;
};

const InstructionElement = ({ name, instruction, theme, indentation }) => {
  return (
    <div>
      <span style={{ color: theme.separatorColor }}>{`${indentation}<?`}</span>
      <span style={{ color: theme.tagColor }}>{name}</span>
      <span
        style={{ color: theme.attributeKeyColor }}
      >{` ${instruction}`}</span>
      <span style={{ color: theme.separatorColor }}>{`?>`}</span>
    </div>
  );
};

const DeclarationElement = ({ attributes, theme }) => {
  return (
    <div>
      <span style={{ color: theme.separatorColor }}>{`<?`}</span>
      <span style={{ color: theme.tagColor }}>{'xml'}</span>
      <Attributes attributes={attributes} theme={theme} />
      <span style={{ color: theme.separatorColor }}>{`?>`}</span>
    </div>
  );
};

TextElement.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

InstructionElement.propTypes = {
  name: PropTypes.string.isRequired,
  instruction: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  indentation: PropTypes.string.isRequired,
};

DeclarationElement.propTypes = {
  attributes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default DeclarationElement;
export default InstructionElement;
export default TextElement;