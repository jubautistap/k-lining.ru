'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDebounce } from '@/hooks/usePerformance';
import { calculateQuote, type PropertyType, type CleaningType } from './calcUtils';

// ... (rest of the file)