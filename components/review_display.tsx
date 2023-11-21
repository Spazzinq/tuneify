import React, { Suspense } from 'react';
import Image from 'next/image';
import { addToCache } from '@/db';
import CustomRating from '@/components/rating';
import Skeleton from '@mui/material/Skeleton';