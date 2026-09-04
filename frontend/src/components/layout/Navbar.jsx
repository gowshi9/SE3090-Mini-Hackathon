import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';

/**
 main
 * @returns {JSX.Element}
 */
export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [

              SAVE FOOD. SHARE HOPE.
            </span>
          </div>
        </Link>

main
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/reserve' && location.pathname.startsWith('/reserve'));
            return (
              <Link
                key={item.label}
                to={item.path}
 main
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

 main
        </div>
      </div>
    </header>
  );
}

