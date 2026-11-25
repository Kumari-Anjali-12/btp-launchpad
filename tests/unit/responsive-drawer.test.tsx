import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MobileNav } from '../../src/components/layout/MobileNav';
import { CodeExample } from '../../src/components/learning/CodeExample';

describe('Work Package 6: Responsive Drawer & Code Overflow Resilience', () => {
  it('traps focus inside mobile navigation drawer when open', () => {
    const handleClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileNav isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    const dialog = screen.getByRole('dialog', { name: /Mobile Navigation/i });
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close navigation drawer/i });
    const links = screen.getAllByRole('link');
    const firstLink = links[0];
    const lastLink = links[links.length - 1];

    // Focus last link and press Tab -> should wrap to closeBtn or first element
    lastLink.focus();
    expect(document.activeElement).toBe(lastLink);

    fireEvent.keyDown(dialog, { key: 'Tab' });
    // In our implementation, Tab from last element wraps to first focusable element
    expect(document.activeElement).toBe(closeBtn);

    // Focus first element (closeBtn) and press Shift+Tab -> should wrap to last element
    closeBtn.focus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastLink);
  });

  it('closes mobile drawer when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileNav isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders code snippet container with role="region", tabIndex={0}, and max-w-full bounding', () => {
    const mockExample = {
      title: 'Core Data Services Entity Definition',
      purpose: 'Define persistent database entities in CAP',
      language: 'cds',
      code: 'entity Employees { key ID : UUID; name : String(100); }',
      lineExplanations: [],
      expectedOutput: 'Table generated in SAP HANA',
      commonMistakes: [],
    };

    render(<CodeExample example={mockExample} />);

    const codeRegion = screen.getByRole('region', {
      name: /Code snippet for Core Data Services Entity Definition/i,
    });
    expect(codeRegion).toBeInTheDocument();
    expect(codeRegion).toHaveAttribute('tabindex', '0');
    expect(codeRegion.className).toContain('overflow-x-auto');
    expect(codeRegion.className).toContain('max-w-full');
  });
});
