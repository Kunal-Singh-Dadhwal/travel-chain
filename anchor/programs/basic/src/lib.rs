use anchor_lang::prelude::*;

declare_id!("7MUhRzYiuxTpkXAPcCDmmBk974HqyedLrf4dpyAFaAGv");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }

    pub fn book_ticket(ctx: Context<BookTicket>, user: Pubkey, route_id: u64) -> Result<()> {
        let ticket = &mut ctx.accounts.ticket;
        ticket.user = user;
        ticket.route_id = route_id;
        msg!("Ticket booked successfully!");
        Ok(())
    }

    pub fn add_route(ctx: Context<AddRoute>, route_id: u64, details: String) -> Result<()> {
        let route = &mut ctx.accounts.route;
        route.route_id = route_id;
        route.details = details;
        msg!("Route added successfully!");
        Ok(())
    }

    pub fn modify_route(ctx: Context<ModifyRoute>, route_id: u64, new_details: String) -> Result<()> {
        let route = &mut ctx.accounts.route;
        route.route_id = route_id;
        route.details = new_details;
        msg!("Route modified successfully!");
        Ok(())
    }

    pub fn view_tickets(ctx: Context<ViewTickets>) -> Result<()> {
        let tickets = &ctx.accounts.tickets;
        for ticket in tickets.iter() {
            msg!("Ticket: User - {}, Route ID - {}", ticket.user, ticket.route_id);
        }
        Ok(())
    }
}


#[derive(Accounts)]
pub struct BookTicket<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8)]
    pub ticket: Account<'info, Ticket>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddRoute<'info> {
    #[account(init, payer = admin, space = 8 + 8 + 256)]
    pub route: Account<'info, Route>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ModifyRoute<'info> {
    #[account(mut)]
    pub route: Account<'info, Route>,
    #[account(mut)]
    pub admin: Signer<'info>,
}

#[derive(Accounts)]
pub struct ViewTickets<'info> {
    pub tickets: Account<'info, TicketList>,
}

#[account]
pub struct Ticket {
    pub user: Pubkey,
    pub route_id: u64,
}

#[account]
pub struct Route {
    pub route_id: u64,
    pub details: String,
}

#[account]
pub struct TicketList {
    pub tickets: Vec<Ticket>,
}
