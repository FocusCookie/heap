import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Heap from "./Heap";

export default {
  title: "Components/Heap",
  component: Heap,
  args: {},
} as ComponentMeta<typeof Heap>;

const heap = {
  ID_8756962371400000_line_0: {
    type: "line",
    id: "ID_8756962371400000_line_0",
    x1: 0,
    y1: 480,
    x2: 80,
    y2: 360,
  },
  ID_8756962371400000: {
    type: "node",
    node: { level: 3, value: 2, id: "ID_8756962371400000" },
    variant: "normal",
    diameter: 80,
    x: 0,
    y: 480,
    key: "ID_8756962371400000",
  },
  ID_2371680152720000_line_1: {
    type: "line",
    id: "ID_2371680152720000_line_1",
    x1: 80,
    y1: 480,
    x2: 80,
    y2: 360,
  },
  ID_2371680152720000: {
    type: "node",
    node: { level: 3, value: 8, id: "ID_2371680152720000" },
    variant: "normal",
    diameter: 80,
    x: 80,
    y: 480,
    key: "ID_2371680152720000",
  },
  ID_1415747602629000_line_2: {
    type: "line",
    id: "ID_1415747602629000_line_2",
    x1: 160,
    y1: 480,
    x2: 240,
    y2: 360,
  },
  ID_1415747602629000: {
    type: "node",
    node: { level: 3, value: 7, id: "ID_1415747602629000" },
    variant: "normal",
    diameter: 80,
    x: 160,
    y: 480,
    key: "ID_1415747602629000",
  },
  ID_5337660430670000_line_3: {
    type: "line",
    id: "ID_5337660430670000_line_3",
    x1: 240,
    y1: 480,
    x2: 240,
    y2: 360,
  },
  ID_5337660430670000: {
    type: "node",
    node: { level: 3, value: 12, id: "ID_5337660430670000" },
    variant: "normal",
    diameter: 80,
    x: 240,
    y: 480,
    key: "ID_5337660430670000",
  },
  ID_6905431382900000_line_0: {
    type: "line",
    id: "ID_6905431382900000_line_0",
    x1: 40,
    y1: 320,
    x2: 160,
    y2: 200,
  },
  ID_6905431382900000: {
    type: "node",
    node: { level: 2, value: 11, id: "ID_6905431382900000" },
    variant: "normal",
    diameter: 80,
    x: 40,
    y: 320,
    key: "ID_6905431382900000",
  },
  ID_1468922199980000_line_1: {
    type: "line",
    id: "ID_1468922199980000_line_1",
    x1: 200,
    y1: 320,
    x2: 160,
    y2: 200,
  },
  ID_1468922199980000: {
    type: "node",
    node: { level: 2, value: 43, id: "ID_1468922199980000" },
    variant: "normal",
    diameter: 80,
    x: 200,
    y: 320,
    key: "ID_1468922199980000",
  },
  ID_9734425878080000_line_2: {
    type: "line",
    id: "ID_9734425878080000_line_2",
    x1: 360,
    y1: 320,
    x2: 480,
    y2: 200,
  },
  ID_9734425878080000: {
    type: "node",
    node: { level: 2, value: 44, id: "ID_9734425878080000" },
    variant: "normal",
    diameter: 80,
    x: 360,
    y: 320,
    key: "ID_9734425878080000",
  },
  ID_1378710006186000_line_3: {
    type: "line",
    id: "ID_1378710006186000_line_3",
    x1: 520,
    y1: 320,
    x2: 480,
    y2: 200,
  },
  ID_1378710006186000: {
    type: "node",
    node: { level: 2, value: 33, id: "ID_1378710006186000" },
    variant: "normal",
    diameter: 80,
    x: 520,
    y: 320,
    key: "ID_1378710006186000",
  },
  ID_1322316537280000_line_0: {
    type: "line",
    id: "ID_1322316537280000_line_0",
    x1: 120,
    y1: 160,
    x2: 320,
    y2: 40,
  },
  ID_1322316537280000: {
    type: "node",
    node: { level: 1, value: 67, id: "ID_1322316537280000" },
    variant: "normal",
    diameter: 80,
    x: 120,
    y: 160,
    key: "ID_1322316537280000",
  },
  ID_2580179426820000_line_1: {
    type: "line",
    id: "ID_2580179426820000_line_1",
    x1: 440,
    y1: 160,
    x2: 320,
    y2: 40,
  },
  ID_2580179426820000: {
    type: "node",
    node: { level: 1, value: 55, id: "ID_2580179426820000" },
    variant: "normal",
    diameter: 80,
    x: 440,
    y: 160,
    key: "ID_2580179426820000",
  },
  ID_9677347118790000_line_0: {
    type: "line",
    id: "ID_9677347118790000_line_0",
    x1: -100,
    y1: -100,
    x2: -100,
    y2: -100,
  },
  ID_9677347118790000: {
    type: "node",
    node: { level: 0, value: 80, id: "ID_9677347118790000" },
    variant: "head",
    diameter: 80,
    x: 280,
    y: 0,
    key: "ID_9677347118790000",
  },
};

const Template: ComponentStory<typeof Heap> = (args) => <Heap {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithData = Template.bind({});
WithData.args = {
  heap: heap,
};
