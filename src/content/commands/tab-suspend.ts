import type { HatchCommand, CommandContext, TabInfo } from '../../types';
import { sendMessage } from './tabs';

export const tabSuspendCommands: HatchCommand[] = [
  {
    id: 'suspend-other-tabs',
    name: 'Suspend Other Tabs',
    description: 'Discard inactive tabs to free memory',
    keywords: ['suspend', 'discard', 'memory', 'free', 'sleep', 'other'],
    icon: '💤',
    category: 'tab',
    action: async (ctx: CommandContext) => {
      await sendMessage({ type: 'SUSPEND_OTHER_TABS' });
      ctx.close();
    },
  },
  {
    id: 'suspend-all-tabs',
    name: 'Suspend All Background Tabs',
    description: 'Discard all tabs except the active one',
    keywords: ['suspend', 'discard', 'all', 'memory', 'free', 'sleep'],
    icon: '😴',
    category: 'tab',
    action: async (ctx: CommandContext) => {
      await sendMessage({ type: 'SUSPEND_ALL_TABS' });
      ctx.close();
    },
  },
];
