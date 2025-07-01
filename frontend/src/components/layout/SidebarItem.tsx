import React from "react";
import { cn } from '../../lib/utils';


interface SidebarItemProps {
    icon: React.ElementType
    label: string
    active?: boolean
    isCollapsed: boolean
    slug: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active = false,
    isCollapsed,
    slug = '#',
}) => {
    return (<>
        <a
            href={slug}
            className={cn('group flex items-center rounded px-4 py-2 text-sm transition',
                active
                    ? 'bg-indigo-50 text-gray-600'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600',
            )}
        >
            <Icon
                className={cn(
                    'size-4 flex-shrink-0 transition-colors',
                    active ? 'text-gray-800' : 'text-gray-400 group-hover:text-indigo-600',
                )}
            />
            <span
                className={cn(
                    'ml-4 font-medium transition-opacity duration-200',
                    isCollapsed && 'hidden opacity-0',
                )}
            >
                {label}
            </span>

        </a>
    </>);
}

export default SidebarItem;