import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the test environment
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Support for alias paths like "@/lib"
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
};

export default config;