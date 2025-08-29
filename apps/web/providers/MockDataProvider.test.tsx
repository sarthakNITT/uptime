import { describe, it, expect, beforeEach, vi} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MockDataProvider, useMockData } from './MockDataProvider';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

global.fetch = vi.fn() as unknown as typeof fetch;

describe('MockDataProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve([]),
    });
  });

  it('should create a new monitor', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockDataProvider>{children}</MockDataProvider>
    );

    const { result } = renderHook(() => useMockData(), { wrapper });

    await act(async () => {
      result.current.createMonitor({
        name: 'Test Monitor',
        url: 'https://example.com',
        status: 'up',
        interval: 60,
        uptime30d: 99.9,
        lastChecked: new Date().toISOString(),
        responseTime: 200,
        region: 'us-east',
      });
    });

    expect(result.current.monitors).toHaveLength(1);
    expect(result.current.monitors[0]!.name).toBe('Test Monitor');
    expect(result.current.monitors[0]!.url).toBe('https://example.com');
  });
});