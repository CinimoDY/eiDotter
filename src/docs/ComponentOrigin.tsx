import React from 'react';
import { componentRegistry, projects } from '../components/registry';
import type { ComponentMeta } from '../components/registry';

interface ComponentOriginProps {
  /** Component name as registered in componentRegistry */
  name: string;
}

/**
 * Renders an origin metadata table for use in Storybook MDX docs.
 * Reads from the component registry to show where a component was
 * created, which projects consume it, and any notes about its origin.
 */
export const ComponentOrigin: React.FC<ComponentOriginProps> = ({ name }) => {
  const meta: ComponentMeta | undefined = componentRegistry[name];

  if (!meta) {
    return null;
  }

  const originName = projects[meta.origin]?.displayName ?? meta.origin;
  const consumerNames = meta.consumers
    .map(id => projects[id]?.displayName ?? id)
    .join(', ') || 'None yet';

  return (
    <table>
      <tbody>
        <tr>
          <td>Created in</td>
          <td>{originName}</td>
        </tr>
        {meta.since && (
          <tr>
            <td>Adopted</td>
            <td>v{meta.since}</td>
          </tr>
        )}
        <tr>
          <td>Consumers</td>
          <td>{consumerNames}</td>
        </tr>
        {meta.originNote && (
          <tr>
            <td>Note</td>
            <td>{meta.originNote}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
