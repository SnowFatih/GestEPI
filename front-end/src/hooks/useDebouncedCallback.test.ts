import { renderHook } from '@testing-library/react';

import { useDebouncedCallback } from './useDebouncedCallback';

describe('useDebounceCallback', () => {
  beforeEach(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('does not run callback until specified timeout', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 10));
    const run = result.current;

    run();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(9);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });

  test('does not run callback if unmounted', () => {
    const callback = jest.fn();

    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 10));
    const run = result.current;

    run();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(9);
    expect(callback).not.toHaveBeenCalled();

    unmount();

    jest.advanceTimersByTime(1);
    expect(callback).not.toHaveBeenCalled();
  });

  test('calling run function repeatedly resets the timeout', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 10));
    const run = result.current;

    run();

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5);
    expect(callback).not.toHaveBeenCalled();

    run();

    jest.advanceTimersByTime(5);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5);
    expect(callback).toHaveBeenCalled();
  });

  test('calling run function repeatedly with different callbacks resets the timeout', () => {
    const callback1 = jest.fn();

    const { result, rerender } = renderHook(({ cb }) => useDebouncedCallback(cb, 10), {
      initialProps: {
        cb: callback1
      }
    });
    const run = result.current;

    run();

    expect(callback1).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5);
    expect(callback1).not.toHaveBeenCalled();

    const callback2 = jest.fn();

    rerender({ cb: callback2 });

    run();

    jest.advanceTimersByTime(5);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });
});
