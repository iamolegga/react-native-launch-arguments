import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    readonly value: { [key: string]: string };
  };
}

export default TurboModuleRegistry.get<Spec>('LaunchArguments');