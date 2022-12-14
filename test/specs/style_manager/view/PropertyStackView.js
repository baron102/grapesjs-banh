import PropertyStackView from 'style_manager/view/PropertyStackView';
import Property from 'style_manager/model/PropertyStack';
import Component from 'dom_components/model/Component';
import Editor from 'editor/model/Editor';
import DomComponents from 'dom_components';

describe('PropertyStackView', () => {
  let em;
  let dcomp;
  let compOpts;
  var component;
  var fixtures;
  var target;
  var model;
  var view;
  var propName = 'testprop';
  var properties = [
    { property: 'subprop1' },
    {
      type: 'integer',
      property: 'subprop2',
      defaults: 0,
      units: ['%', 'px'],
    },
    {
      type: 'select',
      property: 'subprop3',
      defaults: 'val2',
      list: [{ value: 'val1' }, { value: 'val2' }, { value: 'val3' }],
    },
  ];

  beforeEach(() => {
    em = new Editor({});
    dcomp = new DomComponents(em);
    compOpts = { em, componentTypes: dcomp.componentTypes };
    target = new Component({}, compOpts);
    component = new Component({}, compOpts);
    target.model = component;
    model = new Property({
      type: 'stack',
      property: propName,
      properties,
    });
    view = new PropertyStackView({
      model,
    });
    document.body.innerHTML = '<div id="fixtures"></div>';
    fixtures = document.body.firstChild;
    view.render();
    fixtures.appendChild(view.el);
  });

  afterAll(() => {
    component = null;
    view = null;
    model = null;
  });

  test('Rendered correctly', () => {
    var prop = view.el;
    expect(fixtures.querySelector('.property')).toBeTruthy();
    expect(prop.querySelector('.label')).toBeTruthy();
    expect(prop.querySelector('.field')).toBeTruthy();
    expect(prop.querySelector('#add')).toBeTruthy();
  });

  test('Layers rendered', () => {
    expect(view.el.querySelector('.layers')).toBeTruthy();
  });

  test('Layers wrapper should exist', () => {
    expect(view.el.querySelector('[data-layers-wrapper]')).toBeTruthy();
  });

  test('Layers rendered correctly', () => {
    var children = view.el.querySelector('[data-layers-wrapper]').children;
    expect(children.length).toEqual(1);
  });

  test('Layers container is empty', () => {
    var layers = view.el.querySelector('.layers');
    expect(layers.innerHTML).toBeFalsy();
  });
});
