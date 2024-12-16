use anchor_lang::prelude::*;

declare_id!("E4i1Laj8H5ZgcoynwLs3W8NCpg1uDJ2iCQYAbkCNTk6T");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }

    pub fn book_ticket(
        ctx: Context<BookTicket>,
        user: Pubkey,
        route_id: u64,
        price: u64,
    ) -> Result<()> {
        let ticket = &mut ctx.accounts.ticket;
        let clock = Clock::get()?;
        ticket.id = clock.unix_timestamp as u64;
        ticket.user = user;
        ticket.route_id = route_id;
        ticket.price = price;
        ticket.timestamp = clock.unix_timestamp;
        msg!(
            "Ticket booked successfully for user: {}, route: {}, price: {}, timestamp: {}",
            user,
            route_id,
            price,
            clock.unix_timestamp
        );
        Ok(())
    }

    pub fn add_route(
        ctx: Context<AddRoute>,
        route_id: u64,
        details: String,
        distance: u64,
    ) -> Result<()> {
        let route = &mut ctx.accounts.route;
        route.route_id = route_id;
        route.details = details.clone();
        route.distance = distance;
        msg!(
            "Route added successfully with ID: {}, details: {}, distance: {}",
            route_id,
            details,
            distance
        );
        Ok(())
    }

    pub fn modify_route(
        ctx: Context<ModifyRoute>,
        new_details: String,
        new_distance: u64,
    ) -> Result<()> {
        let route = &mut ctx.accounts.route;
        route.details = new_details.clone();
        route.distance = new_distance;
        msg!(
            "Route modified successfully with new details: {}, new distance: {}",
            new_details,
            new_distance
        );
        Ok(())
    }

    pub fn view_tickets(ctx: Context<ViewTickets>) -> Result<()> {
        let tickets = &ctx.accounts.tickets.tickets;
        for ticket in tickets.iter() {
            msg!(
                "Ticket: ID - {}, User - {}, Route ID - {}, Price - {}, Timestamp - {}",
                ticket.id,
                ticket.user,
                ticket.route_id,
                ticket.price,
                ticket.timestamp
            );
        }
        Ok(())
    }

    pub fn get_current_timestamp(ctx: Context<GetTimeStamp>) -> Result<()> {
        let clock = Clock::get()?;
        let current_timestamp = clock.unix_timestamp;
        msg!("Current timestamp: {}", current_timestamp);
        ctx.accounts.data.timestamp = current_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct GetTimeStamp<'info> {
    #[account(mut)]
    pub data: Account<'info, Ticket>,
}

#[derive(Accounts)]
pub struct BookTicket<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 8 + 8)]
    pub ticket: Account<'info, Ticket>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddRoute<'info> {
    #[account(init, payer = admin, space = 8 + 8 + 256 + 8)]
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
    #[account(mut)]
    pub tickets: Account<'info, TicketList>,
}

#[account]
pub struct Ticket {
    pub id: u64,
    pub user: Pubkey,
    pub route_id: u64,
    pub price: u64,
    pub timestamp: i64,
}

#[account]
pub struct Route {
    pub distance: u64,
    pub route_id: u64,
    pub details: String,
}

#[account]
pub struct TicketList {
    pub tickets: Vec<Ticket>,
}
