
import { render, screen, waitFor } from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';
import Dashboard from '../../modules/Dashboard/Dashboard';
import { createMemoryHistory } from '@remix-run/router';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';


describe('Dashboard', () => {
    it('should render a search bar', () => {
        const history = createMemoryHistory();
        const route = '/app/dashboard';
        history.push(route);
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )
        const searchBar = screen.getByRole('textbox')
        expect(searchBar).toBeInTheDocument()
        expect(searchBar).toHaveProperty('placeholder', 'Search...')
    })
    it('should render a tab selector', () => {
        const history = createMemoryHistory();
        const route = '/app/dashboard';
        history.push(route)
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )
        const tabSelector = screen.getAllByTestId('tabselector')
        expect(tabSelector).toBeTruthy();
    })
    it('should render a table', () => {
        const history = createMemoryHistory();
        const route = '/app/dashboard';
        history.push(route)
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )
        const table = screen.getAllByRole('table')
        table.forEach((t) => {
            expect(t).toBeInTheDocument()
        })
    })
    it('should render a pagination', () => {
        const history = createMemoryHistory();
        const route = '/app/dashboard';
        history.push(route)
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )
        const pagination = screen.getAllByTestId('pagination')
        pagination.forEach((p) => {
            expect(p).toHaveTextContent('Previous')
            expect(p).toHaveTextContent('Next')
            expect(p).toHaveTextContent('Page 1 of 100')
        })
    })
    it('clicking on Next button increases page number', async () => {
        const history = createMemoryHistory();
        const route = '/app/dashboard';
        history.push(route)
        render(
            <Router navigator={history} location={history.location}>
                <Routes>
                <Route path={route} Component={Dashboard}/>
                </Routes>
            </Router>
        )

        const nextButton = screen.getByRole('button',{name:/next/i});
        const clickEvent = userEvent.setup();
        await clickEvent.click(nextButton);
        await waitFor(() => {
            const params = new URLSearchParams(history.location.search);
            expect(params.get('page')).toBe('2');
        });
    });
})