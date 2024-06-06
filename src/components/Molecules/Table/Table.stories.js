import React from "react";
import { TableComponent } from "./index";
import Documentation from './Documentation.md'

export default {
  title: "components/Molecules/Table",
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

export const Table = () => <TableComponent />;
