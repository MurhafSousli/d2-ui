import React from 'react';
import { shallow } from 'enzyme';
import MuiSelectField from 'material-ui/SelectField';
import { getStubContext } from '../../../config/inject-theme';
import SelectField from '../SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [{
    id: 'cat',
    name: 'Cat',
},{
    id: 'mouse',
    name: 'Mouse',
},{
    id: 'dog',
    name: 'Dog',
}];

describe('SelectField', () => {
    const renderWithProps = (props) => shallow(<SelectField {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI SelectField', () => {
        expect(renderWithProps({ onChange: () => {} }).type()).toBe(MuiSelectField);
    });

    it('should add a class name', () => {
        expect(renderWithProps({ onChange: () => {} }).props().className).toMatch('d2-ui-selectfield');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-selectfield', onChange: () => {} }).props().className).toMatch('d2-ui-selectfield-my-selectfield');
    });

    it('should set floatingLabelText when label is passed', () => {
        expect(renderWithProps({ label: 'My label', onChange: () => {} }).props().floatingLabelText).toEqual('My label');
    });

    it('should render items array as menu items', () => {
        const component = renderWithProps({ items, onChange: () => {} });

        expect(component.contains(<MenuItem value='mouse' primaryText='Mouse' />)).toBe(true);
    });

    it('should render child nodes inside select field', () => {
        const component = shallow(<SelectField><MenuItem value='cat' primaryText='Cat' /></SelectField>, {
            context: getStubContext(),
        });

        expect(component.contains(<MenuItem value='cat' primaryText='Cat' />)).toBe(true);
    });

    it('should call onChange function when a field content is changed', () => {
        const onChangeSpy = jest.fn();

        renderWithProps({ items, onChange: onChangeSpy }).props().onChange({}, 1);
        expect(onChangeSpy).toHaveBeenCalledWith(items[1]);
    });
});
